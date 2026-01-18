import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    // Verify the request is coming from Sanity
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_WEBHOOK_SECRET)

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request: Missing _type', { status: 400 })
    }

    // Revalidate based on document type
    const tags: string[] = []

    switch (body._type) {
      case 'siteSettings':
        tags.push('site')
        break
      case 'page':
        tags.push('page')
        if (body.slug?.current) {
          tags.push(body.slug.current)
        }
        break
      case 'post':
        tags.push('post')
        if (body.slug?.current) {
          tags.push(body.slug.current)
        }
        break
      case 'therapyOffering':
        tags.push('therapyOffering')
        if (body.slug?.current) {
          tags.push(body.slug.current)
        }
        break
      case 'author':
        // Revalidate all posts when author changes
        tags.push('post')
        break
      case 'category':
        // Revalidate all posts when category changes
        tags.push('post')
        break
      default:
        return NextResponse.json({
          status: 200,
          message: `No revalidation needed for type: ${body._type}`,
        })
    }

    // Revalidate all relevant tags
    for (const tag of tags) {
      revalidateTag(tag, 'default')
    }

    return NextResponse.json({
      status: 200,
      message: `Revalidated tags: ${tags.join(', ')}`,
      now: Date.now(),
    })
  } catch (err: any) {
    console.error('Revalidation error:', err)
    return new Response(err.message, { status: 500 })
  }
}

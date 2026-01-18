import {defineType} from 'sanity'

export const contactFormSection = defineType({
  name: 'contactFormSection',
  title: 'Contact Form Section',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'labels', title: 'Form Labels'},
    {name: 'messages', title: 'Messages'},
  ],
  fields: [
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Phone number to display (e.g., 6982017631)',
      group: 'content',
    },
    {
      name: 'phoneText',
      title: 'Phone Call Text',
      type: 'string',
      description: 'Text before/around phone number (e.g., "Call us at {phone} or fill out the form")',
      group: 'content',
    },
    {
      name: 'requiredFieldsNote',
      title: 'Required Fields Note',
      type: 'string',
      description: 'e.g., "Fields marked with * are required"',
      group: 'content',
    },
    {
      name: 'consentText',
      title: 'Consent Checkbox Text',
      type: 'text',
      rows: 4,
      description: 'Use {{privacy_policy}} where you want the privacy policy link. Example: "I agree to the {{privacy_policy}} and consent to data processing."',
      validation: (Rule) => Rule.required(),
      group: 'content',
    },
    {
      name: 'privacyPolicyPath',
      title: 'Privacy Policy Path',
      type: 'string',
      description: 'Path to privacy policy (e.g., /privacy). Will be localized automatically.',
      initialValue: '/privacy',
      group: 'content',
    },
    {
      name: 'privacyPolicyLinkText',
      title: 'Privacy Policy Link Text',
      type: 'string',
      description: 'Text that replaces {{privacy_policy}} placeholder (e.g., "Privacy Policy")',
      group: 'content',
    },
    {
      name: 'spamNote',
      title: 'Spam Folder Note',
      type: 'text',
      rows: 2,
      group: 'content',
    },
    {
      name: 'labels',
      title: 'Form Field Labels',
      type: 'object',
      group: 'labels',
      fields: [
        {name: 'fullName', title: 'Full Name Label', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'email', title: 'Email Label', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'phone', title: 'Phone Label', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'message', title: 'Message Label', type: 'string', validation: (Rule) => Rule.required()},
      ],
    },
    {
      name: 'placeholders',
      title: 'Form Field Placeholders',
      type: 'object',
      group: 'labels',
      fields: [
        {name: 'fullName', title: 'Full Name Placeholder', type: 'string'},
        {name: 'email', title: 'Email Placeholder', type: 'string'},
        {name: 'phone', title: 'Phone Placeholder', type: 'string'},
        {name: 'message', title: 'Message Placeholder', type: 'string'},
      ],
    },
    {
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'labels',
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      group: 'messages',
    },
    {
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      group: 'messages',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form',
      }
    },
  },
})

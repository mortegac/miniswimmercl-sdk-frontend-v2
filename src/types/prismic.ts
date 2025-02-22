import * as prismic from '@prismicio/client'

// Define las interfaces para tus tipos de contenido
export interface BlogPost extends prismic.PrismicDocument {
  data: {
    title: prismic.RichTextField
    excerpt: prismic.RichTextField
    content: prismic.RichTextField
    featured_image: prismic.ImageField
    publication_date: prismic.DateField
  }
}
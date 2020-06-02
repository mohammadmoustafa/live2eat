interface Image {
  data: Blob,
  content_type: string
}

interface Ingredient {
  quantity: number,
  unit: string,
  label: string
}

interface Recipe {
  _rev?: string,
  _id: string,
  _attachments: {
    [key: string]: Image
  },
  title: string,
  serves: number,
  prepTime: {
    hours: number,
    mins: number,
    label: string
  },
  cookTime: {
    hours: number,
    mins: number,
    label: string
  },
  directions: Array<string>,
  ingredients: Array<Ingredient>,
  category: string,
  notes: string
}

const requirements = {
  name: { 
    type: 'string',
    minLength: 1,
    maxLength: 50,
  },
  age: {
    type: 'number',
    minimum: 0,
  },
  weightInKg: {
    type: 'number',
    minimum: 0,
  }
};

export const PetToCreateSchema = {
  body: {
    type: 'object',
    properties: {
      ...requirements
    },
    required: ['name', 'age', 'weightInKg'],
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: "number" },
        ...requirements
      }
    }
  },
}

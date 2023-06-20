import Ajv, { JSONSchemaType } from 'ajv';

interface Foo {
  foo: number
}

interface Bar {
  foo: boolean
}

const foo: Bar = {
  foo: true
}

const FooSchema: JSONSchemaType<Foo> = {
  $id: 'foo-schema',
  type: "object",
  properties: {foo: {type: "number"}},
  required: ["foo"],
  additionalProperties: false,
}

const ajv = new Ajv({
  schemas: {
    'foo-schema': FooSchema
  }
})



const validate = ajv.getSchema<Foo>('foo-schema')
if (!validate) {
  throw new Error()
}

if (validate(foo)) {
  console.log(foo) // never
} else {
  console.log(foo) // Bar
}

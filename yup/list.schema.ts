import * as yup from "yup";

interface ListSchemaConstraints {
  title: {
    required: string;
    minLength: number;
    maxLength: number;
  };
  order: {
    required: string;
  };
}

export const listSchemaConstraints: ListSchemaConstraints = {
  title: {
    required: "title is required",
    minLength: 1,
    maxLength: 36,
  },
  order: {
    required: "Order is required",
  },
};

export const listSchema = yup.object().shape({
  title: yup
    .string()
    .label("title")
    .required(listSchemaConstraints.title.required)
    .min(listSchemaConstraints.title.minLength)
    .max(listSchemaConstraints.title.maxLength),
  order: yup
    .number()
    .label("order")
    .required(listSchemaConstraints.order.required),
});

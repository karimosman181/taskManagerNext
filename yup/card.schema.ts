import * as yup from "yup";

interface CardSchemaConstraints {
  title: {
    required: string;
    minLength: number;
    maxLength: number;
  };
  order: {
    required: string;
  };
}

export const cardSchemaConstraints: CardSchemaConstraints = {
  title: {
    required: "title is required",
    minLength: 1,
    maxLength: 36,
  },
  order: {
    required: "Order is required",
  },
};

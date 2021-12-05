import * as yup from "yup";
import { convertToRaw } from "draft-js";

export const EditCreatorSchema = (t) =>
  yup.object().shape({
    Draft: yup
      .mixed()
      .test("Draft", t("errors.isRequired"), (value) => {
        return value?.getCurrentContent().hasText() === true;
      })
      .test("Draft", t("errors.tooShort"), (value) => {
        if (value) {
          return (
            convertToRaw(value?.getCurrentContent())?.blocks[0]?.text?.length >
            30
          );
        }
      }),
  });

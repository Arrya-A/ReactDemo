import { FormProvider as Form } from "react-hook-form";
import PropTypes from "prop-types";

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default function FormProvider({ children, methods, onSubmit }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

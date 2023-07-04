interface SliderInputProps {
  inputId: string;
}

const SliderInput = (prop: SliderInputProps) => (
  <input type="text" id={prop.inputId} defaultValue="1.0" />
);

export default SliderInput;

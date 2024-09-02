import { Button as AntdButton } from "antd";
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

const Button = ({ type, text, id, styles }: CommonComponentProps) => {
  const [_, drag] = useDrag({
    type: "Button",
    item: {
      dragType: "move",
      type: "Button",
      id,
    },
  });

  return (
    <AntdButton ref={drag} data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
};

export default Button;

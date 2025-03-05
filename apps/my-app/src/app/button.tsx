import React from "react";
import { Button } from "antd";

//const MyButton = ({ label, onClick, disabled }) => {
    /*return (
      <Button type="primary" onClick={onClick} disabled={disabled}>
        {label}
      </Button>
    );
  };
  */
  

interface MyButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "default" | "dashed" | "text" | "link" ;
}

const MyButton: React.FC<MyButtonProps> = ({ label, onClick, disabled = false, variant = "primary" }) => {
  return (
    <Button type={variant} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

export default MyButton;

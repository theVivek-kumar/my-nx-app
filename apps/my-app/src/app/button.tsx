import React from "react";
import { Button } from "antd";

interface MyButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "default" | "dashed" | "text" | "link";
}

const MyButton: React.FC<MyButtonProps> = ({ label, onClick, disabled = false, variant = "primary" }) => {
  return (
    <Button type={variant} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

const ButtonVariants: React.FC = () => {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <MyButton label="Primary Button" onClick={() => console.log("Primary Clicked")} variant="primary" />
      <MyButton label="Default Button" onClick={() => console.log("Default Clicked")} variant="default" />
      <MyButton label="Dashed Button" onClick={() => console.log("Dashed Clicked")} variant="dashed" />
      <MyButton label="Text Button" onClick={() => console.log("Text Clicked")} variant="text" />
      <MyButton label="Link Button" onClick={() => console.log("Link Clicked")} variant="link" />
    </div>
  );
};

export default ButtonVariants;

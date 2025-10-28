import { forwardRef, InputHTMLAttributes } from "react";

interface BaseProps {
  label?: string;
  type?: "text" | "number" | "password" | "email" | "textarea";
  className?: string;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextAreaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ label, type = "text", className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-semibold text-gray-300 mb-1">
            {label}
          </label>
        )}
        {type === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`w-full !border !outline-none bg-transparent bg-gray-700 p-2 rounded-md text-white ${className}`}
            {...(props as TextAreaProps)}
          />
        ) : (
          <input
            type={type}
            ref={ref as React.Ref<HTMLInputElement>}
            className={`w-full !border !outline-none bg-transparent bg-gray-700 p-2 rounded-md text-white ${className}`}
            {...(props as InputProps)}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

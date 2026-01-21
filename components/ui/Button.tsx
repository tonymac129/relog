"use client";

type ButtonProps = {
  text: string;
  onclick: () => void;
};

function Button({ text, onclick }: ButtonProps) {
  return <button onClick={onclick}>{text}</button>;
}

export default Button;

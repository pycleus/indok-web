import { Typography } from "@material-ui/core";
import { ReactBaseProps, ReactMarkdownProps, ReactNode } from "react-markdown/src/ast-to-react";
import { Variant } from "@material-ui/core/styles/createTypography";

type HeadingComponentWithId = (
  props: ReactBaseProps &
    ReactMarkdownProps & {
      level: number;
      id?: string;
    }
) => ReactNode;

type Paragraph = (props: ReactBaseProps & ReactMarkdownProps) => ReactNode;

const Heading: HeadingComponentWithId = ({ children, id, level }) => {
  const variant = `h${level}` as Variant;
  return (
    <Typography id={id} variant={variant} gutterBottom>
      {children}
    </Typography>
  );
};

export const h1 = Heading;
export const h2 = Heading;
export const h3 = Heading;
export const h4 = Heading;
export const h5 = Heading;
export const h6 = Heading;
export const p: Paragraph = ({ children }) => (
  <Typography variant="body2" paragraph>
    {children}
  </Typography>
);
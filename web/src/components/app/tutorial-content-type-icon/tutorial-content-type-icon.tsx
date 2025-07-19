import { TutorialContentType } from "@/types/tutorial/tutorial-content-type";
import type { IconProps } from "./types";
import { HtmlIcon } from "./components/html-icon";
import { CssIcon } from "./components/css-icon";
import { JsIcon } from "./components/js-icon";
import { TsIcon } from "./components/ts-icon";
import { ReactIcon } from "./components/react-icon";
import { AngularIcon } from "./components/angular-icon";

const iconMap = {
  [TutorialContentType.html]: HtmlIcon,
  [TutorialContentType.css]: CssIcon,
  [TutorialContentType.javascript]: JsIcon,
  [TutorialContentType.typescript]: TsIcon,
  [TutorialContentType.reactjs]: ReactIcon,
  [TutorialContentType.reactts]: ReactIcon,
  [TutorialContentType.angular]: AngularIcon,
} as const;

interface TutorialContentTypeIconProps extends IconProps {
  contentType: TutorialContentType;
}

export const TutorialContentTypeIcon = (
  props: TutorialContentTypeIconProps,
) => {
  const { contentType, ...iconProps } = props;
  const IconComponent = iconMap[contentType];

  return IconComponent ? <IconComponent {...iconProps} /> : null;
};

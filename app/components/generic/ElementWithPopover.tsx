import { ElementType, useRef, useState } from "react";
import { Tooltip } from "antd";
import GenericPopupOver from "./GenericPopover";

interface ElementWithPopoverProps {
  component?: React.ElementType;
  tooltip?: string | JSX.Element | (() => JSX.Element);
  content: any; //content for popover
  onClose?: any;
  positionProps?: {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
  };
}

const ElementWithPopover: React.FC<ElementWithPopoverProps> = ({
  component: Component = "button",
  tooltip,
  content,
  onClose,
  positionProps,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<any>({
    top: 0,
    left: 0,
  });
  const [PopoverContent, setPopoverContent] = useState<JSX.Element | string>(
    ""
  );

  const PopoverRef = useRef(null);

  const togglePopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    content: string | any
  ) => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();

    // Toggle visibility of the popover
    if (isVisible) {
      setIsVisible(false);
    } else {
      const contentToAdd = typeof content === "function" ? content() : content;
      setPopoverPosition({
        top: rect.top,
        left: rect.right + 8,
        ...positionProps,
      });
      setPopoverContent(contentToAdd);
      setIsVisible(true);
    }
  };

  const closePopover = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <div className="relative">
      <Tooltip
        overlayClassName="p-0"
        overlayStyle={{ fontSize: "12px" }}
        mouseEnterDelay={0.75}
        title={tooltip && typeof tooltip === "function" ? tooltip() : tooltip}
      >
        <div>
          <Component
            onClick={(e: any) => togglePopover(e, content)}
          ></Component>
        </div>
      </Tooltip>

      {/* Reusable popover */}
      <GenericPopupOver
        isVisible={isVisible}
        closePopover={closePopover}
        content={PopoverContent}
        position={popoverPosition}
        PopoverRef={PopoverRef}
      />
    </div>
  );
};

export default ElementWithPopover;

import { ElementType, useState } from "react";
import { Tooltip } from "antd";
import GenericPopupOver from "./GenericPopover";

interface ElementWithPopoverProps {
  component?: React.ElementType; // Accepts component
  tooltip?: string | JSX.Element | (() => JSX.Element);
  content: any; //content for popover
}

const ElementWithPopover: React.FC<ElementWithPopoverProps> = ({
  component: Component = "button",
  tooltip,
  content,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [PopoverContent, setPopoverContent] = useState<JSX.Element | string>(
    ""
  );

  const togglePopover = (
    event: React.MouseEvent<HTMLButtonElement>,
    content: string | any
  ) => {
    event.stopPropagation(); // Prevent the click from bubbling up

    const rect = event.currentTarget.getBoundingClientRect();

    // Toggle visibility of the popover
    if (isVisible) {
      setIsVisible(false); // Close the popover if it is open
    } else {
      const contentToAdd = typeof content === "function" ? content() : content;
      setPopoverPosition({ top: rect.top, left: rect.right + 8 });
      setPopoverContent(contentToAdd);
      setIsVisible(true); // Open the popover if it is closed
    }
  };

  const closePopover = () => {
    setIsVisible(false); // Close the popover when needed
  };

  return (
    <div className="relative">
      {/* Triggering Element */}
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
      />
    </div>
  );
};

export default ElementWithPopover;

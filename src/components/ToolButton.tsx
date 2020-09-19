import "./ToolIcon.scss";

import React, { CSSProperties } from "react";


type ToolIconSize = "s" | "m";

type ToolButtonBaseProps = {
  icon?: React.ReactNode;
  "aria-label": string;
  "aria-keyshortcuts"?: string;
  "data-testid"?: string;
  label?: string;
  title?: string;
  name?: string;
  id?: string;
  size?: ToolIconSize;
  keyBindingLabel?: string;
  showAriaLabel?: boolean;
  hidden?: boolean;
  visible?: boolean;
  selected?: boolean;
  className?: string;
  style?: CSSProperties;
};

type ToolButtonProps =
  | (ToolButtonBaseProps & {
      type: "button";
      children?: React.ReactNode;
      onClick?(): void;
    })
  | (ToolButtonBaseProps & {
      type: "radio";

      checked: boolean;
      onChange?(): void;
    });

const DEFAULT_SIZE: ToolIconSize = "m";
const labelStyle: CSSProperties = { width:'7.5rem', marginBottom:'0px'}
export const ToolButton = React.forwardRef((props: ToolButtonProps, ref) => {
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current);
  const sizeCn = `ToolIcon_size_${props.size || DEFAULT_SIZE}`;

  if (props.type === "button") {
    return (
      <button
        className={`ToolIcon_type_button ${
          !props.hidden ? "ToolIcon" : ""
        } ${sizeCn}${props.selected ? " ToolIcon--selected" : ""} ${
          props.className
        } ${
          props.visible && !props.hidden
            ? "ToolIcon_type_button--show"
            : "ToolIcon_type_button--hide"
        }`}
        hidden={props.hidden}
        title={props.title}
        aria-label={props["aria-label"]}
        type="button"
        onClick={props.onClick}
        ref={innerRef}
        style={labelStyle}
      >
        <div className="ToolIcon__icon" aria-hidden="true" style={{width:"inherit",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat", backgroundImage:"url("+props["aria-label"].replace(/ /g, '%20')+".png)"}}>
          {props.icon || props.label}
          {props.keyBindingLabel && (
            <span className="ToolIcon__keybinding">
              {props.keyBindingLabel}
            </span>
          )}
        </div>
        {props.showAriaLabel && (
          <div className="ToolIcon__label">{props["aria-label"]}</div>
        )}
        {props.children}
      </button>
    );
  }
// console.log(props.title)
 var c = '';
 if(props["aria-label"]=="Rectangle" || props["aria-label"]=="Diamond" || props["aria-label"]=="Ellipse" || props["aria-label"]=="Arrow" || props["aria-label"]=="Line"){
   c= 'dropdownstyle';
 }
  return (
    <label className={`ToolIcon ${props.className ?? ""} ${c}`} title={props.title} style={labelStyle} >
      <input
        className={`ToolIcon_type_radio ${sizeCn}`}
        type="radio"
        name={props.name}
        aria-label={props["aria-label"]}
        aria-keyshortcuts={props["aria-keyshortcuts"]}
        data-testid={props["data-testid"]}
        id={props.id}
        onChange={props.onChange}
        checked={props.checked}
        ref={innerRef}
      />
      <div className="ToolIcon__icon" style={{width:"inherit",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat", backgroundImage:"url("+props["aria-label"].replace(/ /g, '%20')+".png)"}}>
        {/* {props.icon} */}
       {/*  {props.keyBindingLabel && (
          <span className="ToolIcon__keybinding">{props.keyBindingLabel}</span>
        )} */}
      </div>
        {/* <label style={{marginBottom:"0px"}}>{props["aria-label"]}</label> */}
    </label>
  );
});

ToolButton.defaultProps = {
  visible: true,
  className: "",
};

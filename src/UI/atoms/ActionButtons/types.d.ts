/* eslint-disable no-unused-vars */
interface IActionButtonsProps {
  config: IUiControls[];
  handler: (ctrls: IUiControls) => () => void;
  isSelected: (value: number) => boolean;
}


export const handleChangeColor = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  const colorTarget = event.target.classList;
  const background = document.querySelector(
    ".board-tasks-container"
  ) as HTMLElement;

  const colorMap: { [key: string]: string } = {
    "color-white": "#fff",
    "color-gray": "#939393",
    "color-blue": "#3d61a2",
    "color-green": "#55a23d",
    "color-yellow": "#a29b3d",
  };

  const className = Array.from(colorTarget).find((cls) => colorMap[cls]);

  if (className) {
    background.style.backgroundColor = colorMap[className];
    selectColor("." + className);
  }
};

import { type Todo as TodoType } from "../types.d";
import { type TodoId, type TodoChangeCompleted } from "../types.d";

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({ id, completed }: TodoChangeCompleted) => void;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleted,
}) => {
  const handleChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    onToggleCompleted({
      id,
      completed: event.target.checked,
    });
  };

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={handleChangeCheckbox}
      ></input>
      <label>{title}</label>
      <button
        className="destroy"
        onClick={() => {
          onRemoveTodo({ id });
        }}
      ></button>
    </div>
  );
};

import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onShow: (t: Todo) => void;
}
export const TodoInfo: React.FC<Props> = ({ todo, onShow }) => (
  <tr data-cy="todo" className="has-background-info-light">
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered" />
    <td className="is-vcentered is-expanded">
      <p className="has-text-danger">{todo.title}</p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
        onClick={() => onShow(todo)}
      >
        <span className="icon">
          <i className="far fa-eye" />
        </span>
      </button>
    </td>
  </tr>
);

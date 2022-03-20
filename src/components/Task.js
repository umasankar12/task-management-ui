function Task({ task, onTglStatus }) {
  return (
    <div className="card text-left" key={task.id}>
      <div className="row">
        <div className="col-10">
          <h4>{task.shortDesc}</h4>
          <div className="task-meta">
            <img
              src="https://icongr.am/feather/calendar.svg?size=12&color=b5b5b5"
              alt="calendar"
            />
            {task.targetDate}
          </div>
        </div>

        <div className="col-2 is-center">
          {task.complete}
          <button
            className="button icon-only clear"
            onClick={() => onTglStatus(task)}>
            {task.status =='close' && "✅"}
            {!(task.status == 'close') && "⬜"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;

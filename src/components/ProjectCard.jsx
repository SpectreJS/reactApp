import '../assets/style/ProjectCard.css'

export function ProjectCard({ project, onSelect }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <div className="project-title-wrap">
          <div className={`project-icon ${project.accent}`}>
            <span className="material-symbols-outlined">{project.icon}</span>
          </div>
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
        </div>
        <span className="project-dot" />
      </div>

      <p className="project-desc">{project.desc}</p>

      <div className="chip-row">
        {project.chips.map((chip) => (
          <span key={chip} className="chip">{chip}</span>
        ))}
      </div>

      <div className="project-footer">
        <span>{project.footer}</span>
        <button type="button" onClick={() => onSelect(project.key)}>
          <span>{project.button}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </article>
  )
}

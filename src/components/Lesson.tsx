import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
  title: string,
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const { slug: pageSlug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableDataFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  });

  const isActiveLesson = slug == pageSlug && isLessonAvailable;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {(availableDataFormatted.charAt(0).toUpperCase() + availableDataFormatted.slice(1)).replace("-feira", "")}
      </span>

      <div 
        className={classNames(`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-color`, {
          'bg-green-500': isActiveLesson,
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2', {
              'text-white': isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border', {
            'border-green-300': !isActiveLesson,
            'border-white': isActiveLesson
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong 
          className={classNames('mt-5 block', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  )
}
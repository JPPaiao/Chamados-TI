export interface IChevronDownIconProps {
	className?: string
}

export function ChevronDownIcon ({ className }: IChevronDownIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || 'w-4'}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

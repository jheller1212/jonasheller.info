'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

interface HeroCta {
  label: string
  href: string
}

interface TeamMemberCardProps {
  position: 'left' | 'right'
  jobPosition: string
  firstName: string
  lastName: string
  imageUrl: string
  description: string
  className?: string
  primaryCta: HeroCta
  secondaryCta: HeroCta
}

function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) return
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  const el = document.getElementById(href.slice(1))
  if (!el) return
  e.preventDefault()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

export default function TeamMemberCard({
  position = 'left',
  jobPosition,
  firstName,
  lastName,
  imageUrl,
  description,
  primaryCta,
  secondaryCta,
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`
  const isPositionRight = position === 'right'
  // The CSS reduced-motion rule can't reach Framer's JS-driven animations,
  // so skip the mount transitions entirely when the user asks for less motion.
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-16 flex flex-col justify-center', className)}
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p
          className={cn(
            'mb-4 text-xs font-medium tracking-[0.3em] uppercase',
            isPositionRight && 'text-right'
          )}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {jobPosition}
        </p>
      </motion.div>

      <div className='flex flex-col md:flex-row items-center justify-end'>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative h-[350px] w-full md:h-[500px] md:w-[360px] shrink-0 overflow-hidden rounded-sm',
            isPositionRight && 'md:order-1'
          )}
        >
          <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
          <Image
            src={imageUrl}
            alt={fullName}
            fill
            priority
            sizes='(min-width: 768px) 360px, 100vw'
            className='object-cover object-top md:object-center transition-transform duration-500 ease-[0.22,1,0.36,1] hover:scale-105'
          />
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative z-[2] flex w-full flex-col gap-6 mt-6 px-4 md:mt-0 md:px-6 md:py-8 md:-left-8 md:w-[calc(100%-350px)] md:gap-12 md:rounded-xl md:backdrop-blur-md',
            isPositionRight && 'md:left-8 md:items-end'
          )}
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 80%, transparent)' }}
        >
          <h1
            className='text-3xl md:text-5xl leading-[1.1] font-extralight tracking-tight'
            style={{ color: 'var(--color-text)' }}
          >
            {firstName}
            <br />
            <span className='font-normal'>{lastName}</span>
          </h1>

          <div className={cn('flex flex-col gap-8 md:flex-row md:gap-10', isPositionRight && 'md:justify-end')}>
            <div className='order-1 md:order-none w-full md:w-[55%]'>
              <p
                className={cn(
                  'text-sm leading-[1.8]',
                  isPositionRight && 'md:text-right'
                )}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {description}
              </p>
            </div>

            <div className={cn('order-2 md:order-none flex shrink-0 flex-col justify-center gap-5', isPositionRight && 'md:order-1')}>
              <motion.a
                href={primaryCta.href}
                onClick={(e) => smoothScrollTo(e, primaryCta.href)}
                whileHover='hover'
                whileTap={{ scale: 0.97 }}
                className='group flex items-center gap-4 cursor-pointer'
              >
                <motion.span
                  variants={{ hover: { scale: 1.1 } }}
                  className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-[var(--color-accent)]'
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <ArrowRight
                    size={20}
                    aria-hidden='true' 
                    className='transition-all duration-300 group-hover:-rotate-45 group-hover:text-[var(--color-accent)]'
                    style={{ color: 'var(--color-text-secondary)' }}
                  />
                </motion.span>
                <span
                  className='text-sm font-medium tracking-wide transition-colors duration-300 group-hover:text-[var(--color-accent)]'
                  style={{ color: 'var(--color-text)' }}
                >
                  {primaryCta.label}
                </span>
              </motion.a>

              <a
                href={secondaryCta.href}
                onClick={(e) => smoothScrollTo(e, secondaryCta.href)}
                className='ml-[4.5rem] w-fit text-sm underline decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70'
                style={{ color: 'var(--color-text-secondary)', textDecorationColor: 'var(--color-border)' }}
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

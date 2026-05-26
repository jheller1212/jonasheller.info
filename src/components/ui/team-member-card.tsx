'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TeamMemberCardProps {
  position: 'left' | 'right'
  jobPosition?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  description?: string
  className?: string
  ctaHref?: string
}

export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Backend Engineer',
  firstName = 'Jennie',
  lastName = 'Garcia',
  imageUrl = 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?fm=jpg&q=60',
  description = 'Jennie is a skilled developer with expertise in modern web technologies and a passion for creating seamless user experiences.',
  ctaHref = '#contact',
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`
  const isPositionRight = position === 'right'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-16 flex flex-col justify-center', className)}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
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
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative h-[350px] w-full md:h-[500px] md:w-[360px] shrink-0 overflow-hidden rounded-sm',
            isPositionRight && 'md:order-1'
          )}
        >
          <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={fullName}
            className='h-full w-full object-cover object-top md:object-center duration-500 ease-[0.22,1,0.36,1] hover:scale-105'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative z-[2] flex w-full flex-col gap-6 mt-6 px-4 md:mt-0 md:px-0 md:-left-8 md:w-[calc(100%-350px)] md:gap-14',
            isPositionRight && 'md:left-8 md:items-end'
          )}
        >
          <div>
            <p
              className='text-3xl md:text-5xl leading-[1.1] font-extralight tracking-tight'
              style={{ color: 'var(--color-text)' }}
            >
              {firstName}
              <br />
              <span className='font-normal'>{lastName}</span>
            </p>
          </div>

          <div className={cn('flex flex-col gap-4 md:flex-row md:gap-8', isPositionRight && 'md:justify-end')}>
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

            <motion.button
              onClick={() => {
                const el = document.querySelector(ctaHref);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group flex h-14 w-14 md:h-20 md:w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300',
                isPositionRight && 'md:order-1'
              )}
              style={{
                borderColor: 'var(--color-border)',
              }}
            >
              <ArrowRight
                size={22}
                className={cn(
                  'transition-all duration-300 group-hover:-rotate-45',
                  isPositionRight && 'rotate-180 group-hover:rotate-[225deg]'
                )}
                style={{ color: 'var(--color-text-secondary)' }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

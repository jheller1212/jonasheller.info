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

      <div className='flex items-center justify-end'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative h-[500px] w-[360px] shrink-0 overflow-hidden rounded-sm',
            isPositionRight && 'order-1'
          )}
        >
          <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={fullName}
            className='h-full w-full object-cover duration-500 ease-[0.22,1,0.36,1] hover:scale-105'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative -left-8 z-[2] flex w-[calc(100%-350px)] flex-col gap-14',
            isPositionRight && 'left-8 items-end'
          )}
        >
          <div>
            <p
              className='text-5xl leading-[1.1] font-extralight tracking-tight'
              style={{ color: 'var(--color-text)' }}
            >
              {firstName}
              <br />
              <span className='font-normal'>{lastName}</span>
            </p>
          </div>

          <div className={cn('flex gap-8', isPositionRight && 'justify-end')}>
            <motion.button
              onClick={() => {
                const el = document.querySelector(ctaHref);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300',
                isPositionRight && 'order-1'
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

            <div className='w-[40%]'>
              <p
                className={cn(
                  'text-sm leading-[1.8]',
                  isPositionRight && 'text-right'
                )}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

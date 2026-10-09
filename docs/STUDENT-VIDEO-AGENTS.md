# Student video agents — implementation brief

2026-09-25 — [Codex]. Destination course project pending confirmation. This document is a proposal, not a deployed feature.

## Verified reusable foundation

Digiassist AI has `lib/coach/anam.ts`, authenticated coach session routes, course-context prompts, and previous-session memory. Local Anam API key and onboarding/strategy/tech-support/examiner persona settings are populated; this review did not test their live validity. Reuse authorized avatar/voice configurations via personalized ephemeral sessions, without editing shared production personas or copying Digiassist-specific business prompts. GDP currently has no student/course routes.

## Initial agents

- Onboarding Tutor: explain the course, learn goals, experience, business stage, language and schedule; save a student-confirmed learner profile and initial plan.
- Class Student Assistant: use current authorized lesson, completed topics, quiz weak areas and recent questions; explain concepts, offer practice, and escalate to the instructor when necessary.
- Business Development Coach: apply course concepts to customer discovery, offers, business models and practical growth experiments.
- Branding Coach: help refine audience, positioning, brand story, messaging and consistency; deliver a working brand brief.

## Later specialist roles

Sales/Pitch role-play partner; AI Tools practice coach; Project/Assignment reviewer using course rubrics; Accountability coach using recorded commitments; Assessment examiner with separate assessment rules.

## Shared student context

One authenticated student profile supplies all roles with relevant, authorized context: preferred name/language, stated goals, business/project details, enrollment, lesson progress, quiz results, assignments and approved prior-session summaries. Keep source/timestamp metadata; distinguish student claims from verified progress. Allow students to correct remembered information. Never assume all user data is relevant or transmit passwords, payment details or identity documents. Never read another student's records. Classroom group sessions must not expose private individual feedback.

Fetch identity from the server session, verify enrollment and lesson access, select course material and role-specific context, then mint a short-lived Anam session token server-side. Keep API keys private. Refresh lesson context on navigation; revalidate authorization for server tools. Save session summaries, learning gaps and agreed actions to the same student record. Confirm successful writes before agents claim a plan or progress was saved. Provide transcripts/text fallback and keep the floating session alive across lesson navigation where appropriate.

## Acceptance criteria

Test cross-student isolation; lesson/course authorization; current-context updates; first-time/returning learner greetings; uncertain or absent facts; summary correction; instructor escalation; session reconnect/expiry; microphone denial; mobile video/text fallback; session duration and usage limits; no duplicated sessions or summaries. Verify a real video conversation with the configured persona. Position as a personalized course experience; do not claim market exclusivity without evidence.

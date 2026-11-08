---
title: nest-cast
description: Say one sentence to an old Google Home Mini in the living room; Claude does the job on the Mac and reads the result back through the same speaker.
hide_title: true
hide_table_of_contents: true
portfolio:
  role: Independent developer
  links:
    source: Source code
---

## Overview {#overview}

Say "Hey Google, remind me today to have the robot…" to a first-generation Google Home Mini, and Google Assistant writes the sentence into Google Tasks. When Claude on the Mac sees a new task starting with 機器人 ("robot"), it does the job, speaks the result through the same speaker, and deletes the task. One sentence in; the computer does the work, the speaker answers, and the list cleans itself up.

## Results {#results}

Tested successfully on a first-generation Google Home Mini on 2026-11-08:

- "Robot, look up an AI news story for me": searched the web and read one story aloud, about 70 s from task created to reply finished, mostly spent searching.
- "Post a joke to Slack" was misheard by speech recognition as nonsense. Claude said on the speaker that it didn't understand, confirmed on the computer, DMed the joke to my own Slack, read it aloud, then deleted the task.

A new task is picked up within one poll: 5 s normally, 1 s after the doorbell rings. The weakest link is Assistant's speech recognition, so commands that make no sense are asked about, not guessed.

## How it works {#technique}

- Mouth: the `nest-cast` CLI drives the speaker over Cast on the LAN: discovery, volume, playback and text-to-speech, with long text split into chunks.
- Ears: Nest speakers run Cast OS, with no ADB and no microphone access, so Assistant writes the sentence into Google Tasks and the Mac polls for new tasks starting with 機器人 every few seconds. The prefix is Chinese because the speaker runs Assistant in Traditional Chinese, where a Chinese word is recognized far more reliably than "Claude".
- Doorbell (optional): a Matter virtual light; "Hey Google, turn on the robot" makes the Mac poll every second.
- Safety: outward actions such as sending messages, deleting or paying are confirmed on the computer first. A task is deleted only after the reply was spoken, and only if its title starts with 機器人.

The cover is an AI-generated concept image.

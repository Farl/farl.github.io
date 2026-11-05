---
title: Ninespin Privacy Policy
description: Privacy policy for Ninespin / 九宮轉
hide_table_of_contents: true
---

# Ninespin Privacy Policy

Effective date: 2026-11-20

This policy explains how Ninespin (九宮轉), a puzzle game by Farl Lee ("I", "me") for iOS, Android and the web (ninespin.pages.dev), handles your data.

## What I don't collect

Ninespin has no accounts. It does not ask for or collect your name, email address, phone number or other information that directly identifies you.

## Local save data

Your level progress and settings are stored only on your device (in the app's storage or the browser's local storage) and are not uploaded to my servers. Deleting the app or clearing browser data removes them. Settings can turn your progress into a backup code (or file) so you can move it to another device; the code stays with you, and the game never uploads it.

## Analytics (PostHog, Firebase / Google Analytics)

To improve the game, the apps send gameplay events: levels played, moves, time taken, runs, purchase events and language. They include how a puzzle went: how often a move took the board further from solved and how you got back (for example with Undo). They also include error reports when something in the game breaks (an uncaught error, a part that failed to load, a lost graphics context): the kind of error, a shortened technical message, the screen it happened on and whether the game recovered, with nothing that identifies you.

**When analytics runs.** In the EEA, the UK and Switzerland, analytics runs only after you consent (in the consent form shown at launch) to storing or accessing information on your device and to measuring content performance. Elsewhere, where no consent is required, analytics runs by default. Until consent is given, nothing is sent: events are held only in memory and nothing analytics-related is stored on your device. If the consent service can't be reached at launch, that session's events are discarded.

**What is sent.**

- [PostHog](https://posthog.com/privacy) receives the gameplay events, plus a random install ID created by the app, platform, app version and language. No personal profile is created. PostHog derives your approximate country from your IP address.
- [Firebase / Google Analytics](https://policies.google.com/technologies/partner-sites) receives the same events, plus data Firebase collects automatically: an app instance ID, first open, sessions, device model and operating system. Google's consent settings for ad storage, ad user data and ad personalisation follow your consent choices.

**Advertising ID.** Analytics is not linked to your advertising ID. Firebase's advertising ID collection is turned off on Android, and the iOS app does not give Firebase access to the IDFA. PostHog uses only its own random ID.

**Web version.** ninespin.pages.dev uses only PostHog. There is no Google Analytics, no cookies and no local storage for analytics; a random ID is kept in memory for the current visit only.

## Game settings downloaded at launch

The game reads a small public settings file from ninespin.pages.dev (for example how often ads appear or how many free hints there are), so they can change without an app update. It is the same file for everyone; the request carries no ID and nothing about you beyond what any web request does (your IP address, seen by the site's host, Cloudflare). For a test of two settings, your device picks its own group at random and keeps it locally; analytics, if allowed, reports only which group that was.

## Game Center and Google Play Games (optional)

If your device is already signed in to Game Center (iOS) or Google Play Games (Android), the app uses it for achievements and two leaderboards (longest daily streak, longest Flow run). The app sends only which achievements you earned and those two scores; Apple or Google show them with your player name under their own privacy policies ([Apple](https://www.apple.com/legal/privacy/), [Google](https://policies.google.com/privacy)). If you are not signed in, nothing is sent and the game works the same.

## Share images

When you tap Share, the game draws an image of your result on your device and hands it, with the text, to the app you choose. I do not upload it or keep a copy.

## Advertising (Google AdMob)

The iOS and Android versions show ads between stages through Google AdMob, and offer an optional ad you can choose to watch for extra hints. Google and its partners may use:

- your device's advertising ID (the Android advertising ID; on iOS, the IDFA only if you allow tracking in the App Tracking Transparency prompt)
- device information (such as model, operating system, language and approximate location, e.g. country derived from IP address)
- ad interaction and usage data

to serve and measure ads and to prevent fraud. If you are in the EEA, the UK or Switzerland, the app asks for your consent at launch through Google's User Messaging Platform (UMP). See [How Google uses information from sites or apps that use its services](https://policies.google.com/technologies/partner-sites).

You can also reset your advertising ID or limit ad tracking in your device settings.

## Changing or withdrawing consent

Where consent rules apply, the home screen of the app shows a **Privacy options** link. It opens Google's privacy options form, where you can change or withdraw your consent at any time. If you decline or withdraw consent, queued analytics events are discarded, nothing more is sent, Firebase collection is disabled, and the install ID and any pending analytics data on your device are deleted.

## In-app purchases

Purchases (Remove Ads, the Supporter pack and its upgrade) are processed by Apple (App Store) or Google (Google Play). I do not receive your payment details.

## Children

Ninespin is not directed at children under 13, and I do not knowingly collect personal information from children.

## Changes

If this policy changes, I will update this page and the effective date above.

## Contact

Questions about this policy: [farlasonao@gmail.com](mailto:farlasonao@gmail.com).

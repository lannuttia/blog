---
layout: post
title: "Why I Chose Ryzen"
date: 2021-09-08 11:33:16 -0500
category: blog
tags: [pc-building]
---

I just recently built my first computer. The last computer that I had, was a
Dell Inspiron 3847 that I bought from Best Buy back in 2013. Honestly, I was
pretty happy with that for a while and it managed to last me much longer than
I would have expected. What finally did me in and made me decide that it was
time to build a new computer was when I tried to spin up Feed the Beast
(heavily modded Minecraft) for the first time in probably 2 years. In the past
I could usually get at least somewhat playable framerates as long as I was
willing to make compromises with things like my graphics settings and chunk
render distances. My Intel i5-4460 would be able to kind of keep up if I was
nice to it and didn't try to push it too hard. However, when I tried to play it
again, I was not able to get above 5 or 10 fps with all of the settings cranked
all the way down. I had made compromises with my computer for a while because I
did not want to spend the money to get another one.

Fast forward a day and I had all the parts ordered and a plan for what I wanted
to do. I got a Samsung 980 NVMe SSD, Ryzen 7 3700X CPU, Cooler Master Hyper 212
RGB Black Edition CPU cooler, MSI B550-A PRO ATX AM4 motherboard, Crucial
Ballistix 2x16GB DDR4-3200 CL16 memory, Corsair RM 750W 80+ Gold fully modular
power ATX power supply, and an NZXT H510 ATX mid tower case for it all to go in.
As for the graphics card, I'm not about to try and find a graphics card in this
market and all the parts that I bought didn't leave a whole lot of room in the
budget for a new graphics card so I salvaged my GTX 1050 that I used in my old
rig.

In order to understand why I went with a CPU that has 8 physical cores with
hyperthreading, I need to explain what my usual workload is. Even though
playing minecraft is what encouraged me to upgrade my computer, playing games
isn't a majority of what I do on my computer. I run Gentoo Linux, so a
non-trivial amount of the work that my computer does is compiling source
code which is highly parallelizable. So while games may or may not be able to
benefit from the high core counts I was able to get from Ryzen, compiling
definitely does benefit from those high core counts.

On my old Dell Inspiron 3847, it would take upwards of a week of compiling
around the clock in order to compile something like Chromium. On my new rig,
compiling Chromium takes about 2 hours and 20 minutes. That is a massive
quality of life improvement in and of itself. As for memory, while I think
16 GB is more than enough for most workloads, the general recommendation for
compiling with GCC is to have 2 GB per job you spawn. Since I want to use all
of my cores, I want to use 16 jobs which ultimately means I need 32 GB of RAM
in order to comply with that general recommendation.

On the topics of thermals, my Intel i5-4460 always ran exceptionally cool. I
usually wouldn't see it report temperatures above 40 °C at full load. This
Ryzen CPU definitely runs hotter. I see it usually idle at about 40 °C
and at full load I see it get around 70 °C. All in all though, that isn't hot
enough for anything to start thermal throttling and based on some cursory
research I've done, seems to be about right. I've been extremely pleased with
Ryzen though and assuming Intel keeps having difficulties with shrinking their
process size, I think AMD is going give them a run for their money in the
consumer CPU market unless Intel manages to turn things around and fast.

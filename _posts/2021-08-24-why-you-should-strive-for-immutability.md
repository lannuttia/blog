---
layout: post
title: "Why You Should Strive for Immutability"
date:   2021-08-24 11:55:13 -0500
category: blog
tags: [software-engineering]
---

Just to get my biases out of the way right off the bat, I am not a fan of
object-oriented programming (OOP). I tend to prefer functional programming
(FP). I'll go into more detail about why I'm not a fan in a future post but I'll
quickly go over what I don't like. In my experience OOP leads to code that is
more difficult to build, maintain, parallelize, and test.

In FP, you love immutability. In fact, immutability is one of the core
principles of FP. There are many reasons for this and it has been discussed
much more eloquently than I could ever hope to discuss it myself. However, I'm
going to attempt to discuss this topic for myself and throw my own spin on it.

A while back, I watched an NDC Conference keynote by Kevlin Henney on
Refactoring for Immutability. I highly recommend that anyone who is a software
developer watch this talk as I found it extremely impactful on how I view the
code that I write. In this keynote, there was one slide that stood out to me
over all of the other slides. Stop, read it, process it, let it sink in.

![How Mutability and State Sharing Affect the Need for Synchronisation](https://image.slidesharecdn.com/refactoringtoimmutability-180703134457/95/refactoring-to-immutability-24-638.jpg?cb=1530625794)

I know this isn't a new concept but I like how it can be visualized here likely
because this is reminiscent of
[root locus](https://en.wikipedia.org/wiki/Root_locus) analysis from back in my
Electrical Engineering days.

When you look at a root locus plot, you can very easily see if that system is
stable by looking at the position of the poles. As long as your roots aren't in
the right hand (or positive plane), your system is stable. In the case of the
slide that I've referenced from Kevlin Henney's keynote, there isn't a whole
side of that plane that you need to stay out of. You just want to stay out of
the top right quadrant. Why do you want to stay out of that quadrant you ask?
Because if you enter that quadrant then you instantly need to concern yourself
with locking. We want thing to run in parallel so that we can make things run
faster. Locks, however are extremely good at making things run really slow in
addition to protecting state that gets mutated. Maintaining code with locks is
more difficult than maintaining code without locks so if we can avoid it, we
should.

I'm sure you've reasoned this by now but immutability is the solution
to this problem. Notice that much like the root locus plot I mentioned earlier,
as long as you stay out of the top right-hand quadrant you don't need to worry
about synchronization! You don't even really have to think about it. If nothing
is being shared, then there is no way that your other threads or processes can
stomp all over whatever each other is trying to do. Now you can say, well if I
don't share state, then I can mutate that state all I want and I'm still safe.
Yes, that is true. But if we do that and we could have parallelized things we
could be leaving a substantial amount of performance on the table depending on
the task that is being performed.

In my personal opinion it is better to write something in a way that takes
advantage of immutability so that I can possibly parallelize in the future,
even if I don't want to do it now. Any software engineer worth his or her
salt knows that business requirements change rapidly. Writing your code in
such a way that prevents you from adapting to business needs without the
need for invasive refactoring is foolish and will likely come back to bite
you in the future.

When I decide to discuss this again, I'm sure I'll bring more concrete examples
with actual code but it's getting late where I'm at so I think I'm going to
call it a night. 

Keep on coding and don't change for anyone.

^^Shameless immutability pun 🤓

## References:
- [Refactoring to Immutability - Kevlin Henney](https://www.youtube.com/watch?v=APUCMSPiNh4)

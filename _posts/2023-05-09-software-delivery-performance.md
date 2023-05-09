---
layout: post
title: "Software Delivery Performance"
date: 2023-05-09 17:30:00 -0500
category: blog
tags: [software-engineering]
---

Over the course of my career, I have been on several teams with varying team cultures.
I have been on a smaller team that had more of a cowboy coding way of operating. I have
also been on a larger team that had very strict coding standards dictated to them
from on high. I have also been on a team that I would consider to be in the middle,
where developers have a lot of autonomy but software delivery is not a complete
free-for-all. Over the course of working on these various teams, I have seen several
different ways of delivering software and have also seen the pain points for those
various methods of software delivery. One thing that has bothered me is how I have seen
enforcement of various standards that are intended to improve software quality actually
having the opposite effect. While this is definitely not an exhaustive list, these are the
ones that I am the most familiar with.

### Requiring Manual Quality Assurance Reviews
While I think having multiple sets of eyes on something is a good thing, I don't think that
requiring manual reviews from Quality Assurance is a good practice. The reason for
this is that Quality Assurance resources are limited and it might actually take quite a while
for Quality Assurance resources to find the time to actually manually review the thing that
you want to get deployed. I also think that developers knowing that everything needs to be
reviewed by Quality Assurance before it can go out can give developers an excuse to skip on
writing tests that they probably should write because "What's the point? QA has to review
everything anyways". Furthermore, any kind of manual review is extremely expensive because
it requires a second person who might not have the same priorities to step away from whatever
it is that they were doing to unblock you and who actually knows how long that will be.
I think it's a self inflicted bottleneck that I have never actually seen be worth it.

### Hard Code Coverage Requirements
I think that the crux of the issue with hard code coverage requirements is that it is
attempting to manage the outcomes that people care about such as change failure rate,
lead time, and preventing regressions by managing inputs. I don't think that this is the
right way to go about trying to improve the metrics that stakeholder's actually care about.
In my experience, when you dictate metrics such as code coverage, you will definitely hit
the number that you dictated but you will inevitably end up with low quality tests that were
written soley for the sake of inflating the code coverage metric. These tests are usually
tightly coupled to implementation details because the things that they are attempting
to test are not things that can be easily tested. When you end up with tests that are tightly
coupled to the implementation details, I would argue that they actually provide negative value
to your team because they don't test that the thing they are testing isn't broken. All they test
is that the implementation hasn't changed. This is especially pernicious because it
undermines developer confidence in the tests because test failures don't actually mean that
something is broken. They merely mean that the implementation has changed.

### How Else Can We Improve Software Delivery Performance
I recently finished [Team Topologies](https://teamtopologies.com/book) and am currently reading
[Accelerate](https://www.oreilly.com/library/view/accelerate/9781457191435/). As I have been
reading these books, I have found myself smiling and nodding because they echo my own experiences
so well. I think that Accelerate draws attention to several metrics that I think are what we should
actually optimize to improve software delivery performance. These metrics are lead time, release
frequency, and time to restore service. I think that by building your processes around improving
those metrics, you are improving what what stakeholders actually care about. Furthermore, all of the other things
that individual contributers want such as architecural improvements and testing will follow since you can't
improve those metrics without making improvements in those areas. While Team Topologies is a little less
practical for someone like myself that is currently an individual contributer, it did provide a couple of
things that I can be aware of and that I think can help teams improve software delivery performance.
My main takeaway from that book was that Conway's law dictates that teams will create software systems
that mimic how they communicate. This means that unecessary communication will ultimately lead to
unnecessary coupling and thus decrease software delivery performance since it will inevitable increase
lead times and decrease your release frequency.

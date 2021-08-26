---
layout: post
title: "The Problem with Inheritance"
date: 2021-08-26 10:32:15 -0500
category: blog
tags: [software-engineering]
---

Composition over inheritance is a principle that exists in object-oriented
programming (OOP) for a very good reason. I have personally been bitten by
using inheritence more times than I would care to admit.

Lets look at a contrived inheritance example to demonstrate some of the issues.

Using inheritance:
```java
public class Person {
  public String title;
  public String name;
  public Integer age;

  public Person(String title, String name, Integer age) {
    this.title = title;
    this.name = name;
    this.age = age;
  }
}

public class Employee extends Person {
  public Integer salary;
  public String title;

  public Employee(String title, String name, Integer age, Integer salary) {
    this.title = title;
    this.name = name;
    this.age = age;
    this.salary = salary;
  }
}
```

Using composition:
```java
public class Person {
  public String title;
  public String name;
  public Integer age;

  public Person(String title, String name, Integer age) {
    this.title = title;
    this.name = name;
    this.age = age;
  }
}

public class Employee {
  public Person person;
  public Integer salary;
  public String title;

  public Employee(Person person, Integer salary, String title) {
    this.person = person;
    this.salary = salary;
    this.title = title;
  }
}
```

Notice that in the example using inheritance, the title property of the
Employee class shadows the title property that the Employee class would
inherit from the Person class. In order to preserve all of the information
in the Employee instance that was inherited by the super class, all of your
property names would need to be mutually orthogonal (i.e. you cannot use the
same name). This is not a nice property because now we need to concern
ourselves with inherited property names when we are deciding how to name
properties in whatever subclass we are writing.

Lets compare that with the composition example. Notice that in the composition
example, our property naming in the Employee class definition does not need to
depend on the property names in the Person class definition. We can have title
properties on both the Employee and Person classes and preserve all of the
information without ensuring the property names are mutually orthogonal.

This might not sound like a huge deal since converting title to something like
employeeTitle in the Employee class or personTitle in the Person class isn't
a super complicated change. The issues with doing something like that though is
that it decreases the readability and maintainability of the software when you
do something like that especially if you are writing something like a public
API where name changes like that can very quickly require breaking changes to
the public API.

That however isn't the only problem with inheritence. Let's look at another
contrived example.

Using composition:
```java
public abstract class Duck {
  public void quack() {
    System.out.println("Quack!");
  }
  public void display() {
    System.out.println(this.getClass().getSimpleName());
  }
}

public class Mallard extends Duck {
}

public class MarbledDuck extends Duck {
}

public class WoodDuck extends Duck {
}
```

Looking at this you might say "That looks great! Everything is shared and I'm
not having to write hardly any code for each non-abstract class." and yeah,
it's fine for now.

![Bill Lumbergh Meme](/assets/2021-08-26-bill-lumbergh-meme.jpeg)

Now there's your problem. How were you supposed to know that the business was
going to pivot like this and now they want support for a rubber duck. I mean,
it's still a duck, kind of... But it isn't an actual duck so it doesn't quack.
In order to implement that rubber duck now that you've committed to using
inheritance, you have to touch every duck subclass just to add support for the
rubber duck. This is a lot of work to add a new feature. However, if you had
just used composition, you would have likely been able to implement the rubber
duck feature without having to touch any of the subclasses. Lets consider this
alternative implementation

```java
public interface Quackable {
  public default void quack() {
    System.out.println("Quack!");
  }
}
public interface Displayable {
  public default void display() {
    System.out.println(this.getClass().getSimpleName());
  }
}

public class Mallard implements Quackable, Displayable {
}

public class MarbledDuck implements Quackable, Displayable {
}

public class WoodDuck implements Quackable, Displayable {
}

public class RubberDuck implements Displayable {
}
```

Notice now because behavior was composed in rather than inherited, I was able
to add support for RubberDuck without having to modify or restructure any of
the other ducks that we already supported.

The your world as a Software Engineer is unpredictable not only because
technology makes it unpredictable but because business itself is unpredictable.
Preparing for the unexpected through intelligent intentional design is an
extremely valuable skill that is bound to save you and your collegues a lot of
headaches in the future.

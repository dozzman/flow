// @flow

type Mode = "a" | "b" | "c";

let tests = [
  function(x: string) {
    if (x === 'foo') {
      (x: void); // error
    }
    (x: 'foo'); // error
  },

  function(x: string) {
    if (x !== 'foo') {
      (x: 'foo'); // error
    }
    (x: void); // error
  },

  function(x: 'bar'): 'foo' {
    if (x === 'foo') {
      return x; // unreachable, no error
    }
    return 'foo'; // error
  },

  function(x: 'foo'): string {
    if (x === 'bar') {
      return x;
    }
    return x;
  },

  function(x: 'foo') {
    if (x !== 'bar') {
      (x: 'foo');
    }
    (x: 'foo');
  },

  function(x: 'foo'): string {
    if (x === 'foo') {
      return x;
    }
    return x;
  },

  function(x: 'foo' | 'bar') {
    if (x === 'foo') {
      (x: 'foo');
      (x: void); // error
    }
    if (x === 'bar') {
      (x: 'bar');
      (x: void); // error
    }
  },

  function(x: { foo: string }): 'foo' {
    if (x.foo === 'foo') {
      return x.foo;
    }
    return x.foo; // error
  },

  function(
    x: { kind: 'foo', foo: string } | { kind: 'bar', bar: string }
  ): string {
    if (x.kind === 'foo') {
      return x.foo;
    } else {
      return x.bar;
    }
  },

  function(str: string): Mode {
    var ch = str[0];
    if (ch !== "a" && ch !== "b" && ch !== "c") {
      throw new Error("Wrong string passed");
    }
    return ch;
  },

  function(s: string): ?Mode {
    if (s === "a") {
      return s;
    } else if (s === "d") {
      return s; // error
    }
  },

  function(mode: Mode) {
    switch (mode) {
      case "a":
        (mode: "a");
        break;

      case "b":
      case "c":
        (mode: "b" | "c");
        break;
    }
  },
];

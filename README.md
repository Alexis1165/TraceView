# SWTTraceView-2

Run-time verification and testing of software relies on traces which are snapshots of
the program state at certain points in time documenting the software behavior. When the
behavior deviates from the programmer’s expectation, often inspection of the trace may
reveal the cause. However, reading traces as a human being may be cumbersome depending
on the amount of data. Therefore, the main aim of this project was to design and implement a
Trace Viewer as a VS Code plugin so as to provide an adequate visualization of the traces for
efficient debugging in the same IDE where the development takes place.


# Installation

The install file can be found in the Installer folder located in the root directory of the project. the file can be installed using 

```sh
$ code --install-extension traceview-final-1.0.1.vsix
```

# Usage
Test files containing trace files with images to compare the result with are located in the 'Sample Files' folder in the root directory 


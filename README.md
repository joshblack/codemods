# codemods

[![Build Status](https://travis.innovate.ibm.com/joshblack/codemods.svg?token=fzzzzZdVsvEKkRSKEdP2)](https://travis.innovate.ibm.com/joshblack/codemods)

This repository holds a variety of files used to help transform older JS files into a more up-to-date format. The underlying tool used is `jscodeshift`, which allows us to define arbitrary transform functions that we can use to move around and update a file depending on certain conditions.

## Contributing

In order to contribute, make sure to add your transform under `src/transforms` and add tests cases for it inside of the `test` directory. The naming convention inside of `test` is to have the name of your transform as the folder name, then inside of that folder you create a `transform.js` file that references your transform. You then create folders for specific cases, placing an `actual.js` file and `expected.js` file inside of that which describe how you view the input and output of your transformation function.

Thank you for your interest in Picsart Creative APIs SDK project contribution! Please refer to the following sections on how to contribute code and bug reports.

# Repository Structure

| fold          | description                                                                              |
|---------------|------------------------------------------------------------------------------------------|
| `/src/`       | folder containing the source files that implement API usage                              |
| `/tests/`     | folder containing tests that ensure the high quality and stability of the implementation |
| `/scripts/`   | folder containing scripts                                                                |
| `/examples/`  | folder containing examples and samples of the SDK usage                                  |

## General Requirements

When submitting changes and improvements to the codebase, it's important to provide all important pieces as described below

- Source code:
  - Contribute the main source code changes in `/src/`.
  - Choose the right folder to publish the new implementation: `/src/image-api/` or `/src/genai-api`.
  - Create a new folder for new endpoints, for example, `/src/image-api/new-service-name/`.
  - Copy the style and create separate files for the request, result and the main implementation.
  - Provide proper documentation for each added piece.

- Tests:
  - Create tests for all newly added functionality.
  - Following the same pattern as with the source code, put tests under `/tests/image-api/` or `/tests/genai-api` folders.
  - Run tests and make sure no test is failing because of the changes. Make sure to fix all tests before committing changes.
  
- Third party libraries:
  - In case new third party library dependencies are added, make sure to list those in the `/README.md` file, under the License section.
  - Add the name of the library, version, the license, also a short description what that library is used for.

- Copyright Notice and License Template:
  - Run the `/scripts/license.sh` to add the boilerplate license notice to the new files.

# Reporting bugs
Before submitting a question or reporting a bug, please take a moment of your time and ensure that your issue isn't already discussed in the project documentation or in the [Github issue tracker](../../issues) . 
If you have identified a previously unknown problem, it's essential that you submit a self-contained and minimal piece of code that reproduces the problem. The bugs need to be reported in Gihub issue tracker, with “bug” label on them. In the Comment section, clearly explain what was your expectation, and what is the actual result of the execution. Try to isolate the function(s) that malfunction, attach the code snippets that can be easily compiled and run in isolation.
From the same issue tracker, You can also ask questions to CppBind code owners, by using “question” label while creating the Issue.

# Pull requests
Contributions are submitted, reviewed, and accepted using GitHub pull requests. Please refer to [this article](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) for details and adhere to the following rules to make the process as smooth as possible:
- Make a new branch for every feature you're working on.
- Make small and clean pull requests that are easy to review but make sure they do add value by themselves.
- While contributing, please, follow the Style Guides
  - for Python Coding defined as [Google Pythong Style Guide](https://google.github.io/styleguide/pyguide.html)
  - for Java Coding defined as [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
  - for Typescript defined as [Google Typescript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Add tests for any new functionality and run the test suite to ensure that no existing features break
- Every pull request needs to have at least 2 approvals before being merged. The mandatory approvers are code owners of the repository.
- Merging is getting done by Picsart, that is in charge of the tool stability and maintainability.
 
# Release cycle
There is no fixed releases cadence, the new fixes/enhancements will be published on-demand.
The release train will take all the merges done after the last release, and generate a new release tag for them, with Semantic Versioning rules. 
Release Notes will be located in the Github Releases file, with the latest first order, as well as at [Creative APIs Releases](https://docs.picsart.io/docs/creative-apis-releases) page.

# Licensing of contributions
Picsart Creative APIs SDK is provided under a MIT license that can be found in the [LICENSE](./LICENSE) file. By using, distributing, or contributing to this project, you agree to the terms and conditions of this license.

# backend-hardware-designs-registry

## References for inspiration
- [Thingiverse](https://www.thingiverse.com/)
- [NPM registry](https://www.npmjs.com/)

Similar to npm or yarn we want to have a registry of repositories with all the documentation and file downloads ready to use to replicate designs

## Guidelines
- Use git flow. Just do `git flow init`. This way we can work on specific features and have a good product backlog.
- Use SCRUM with product backlog
- Ideally lets plan a sprint after we have a decent product backlog

## Core entities(nodes) in graph
## Schemas should follow user stories
Please add if something is missing 🙏 
### Basic fields:
Check the npm package registry for instance
**Design node:**
- Auhtor
- Github repository (Optional)
- Design image
- Stars (Likes?)
- Comments
- Status
- Date
- Version (Released)
- License

**User (Designer) node**
- Image
- Name
- Description
- Keywords

**Post (Equipment request, Need driven)**
(Not considered the basic fields like ids, etc.)
- Comments
- Createdby


# Tests Norms

- Use dedicated testing folder
- Name tests: filename.spec.js

### Directory Structure:

- tests/
  - components/
    - Auth.spec.js
  - api/
    - users.spec.js
  - db/
    - user.spec.js

<details open>
<summary>What Makes a Good Test (Express)?</summary>
- Each route should receive at least one test case
- If your route could send back a different status for different kinds of requests (ex. if a GET route for /api/users/:userId could return a single user with status of 200, or a 404 if no user is found, there should be a test for each case).
- Don't just test to make sure that the response body is an array or an object - make sure that the data is what you expect! If a GET request should send back data with specific fields populated (for example, by using eager loading or scopes), make sure that your response body has those fields. Likewise, if a PUT or POST should create or modify data, make sure that the data in your response body actually matches the intended change.
- The tests for your routes should treat your route like a black box: for a given request, you should expect to receive some kind of response back. You should not test anything about the implementation of the route itself.
  - For example, using a spy to see if a certain Sequelize method was used would be a bad idea. What if you change your mind about which Sequelize method to use later? What if you stop using Sequelize altogether and swap in a different ORM? Your test would now be useless - the reason we wanted this test in the first place was so that we could change the way we implement the route, and confirm that it still worked!-
</details>

<details open>
<summary>What Makes a Good Test (Sequelize)?</summary>

- Any methods that you write deserve tests (instanceMethods, classMethods, hooks, and model validator methods)
- Do not write tests for code that Sequelize owns - methods like findAll, create, update, etc, and field validations like allowNull.
  Extra note on validations: generally, you should only test model validator methods - the non-trivial methods that you write to validate your model instances. Simple validations like allowNull and other field aspects like defaultValue should not be tested by you - they are Sequelize's responsibility.

</details>

<details open>
<summary>What Makes a Good Test (React)?</summary>

</details>

<details open>
<summary>What Makes a Good Test (Redux)?</summary>

- Your reducer should get at least one test case for each action it consumes
- Each action creator deserves a test case (even though they seem very simple - think of it as a free pass)!
- For thunk creators and thunks, you should test that they:
  - Make the appropriate network request(s) (if they do this)
  - Eventually invoke the dispatch method with certain actions (spying on the dispatch method using sinon is recommended here)
    - Note the emphasis on actions - you should test that the dispatch method is invoked with certain action objects - NOT that certain action creators were invoked (see below)
- For thunk creators and thunks, you should NOT test:
  - The actual result of the network request - this is the job of your server tests!
  - That certain (synchronous) action creators are invoked - this is the job of your action creator tests.
  </details>

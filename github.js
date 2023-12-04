const initGithubWebhook = (controller) => async (req, res) => {
  try {

    const event = req.header("X-GitHub-Event");

    console.log(`Received ${event} from GitHub`);

    switch (event) {
      case "issues":
        await handleIssueChange(controller, req, res);
        break;
      case "pull_request":
        switch (req.body.action) {
          case "closed":
            console.log("closed event");
            break;
          case "opened":
            console.log("opened event");
            break;
          case "review_requested":
            console.log("review_requested event");
            break;
          case "edited":
            console.log("edited event");
            break;
          case "synchronize":
            console.log("synchronize event");
            break;
          default:
        }
        break;
      case "pull_request_review":
        console.log("pull_request_review event");
        break;
      case "workflow_run":
        console.log("workflow_run event");
        break;
      case "status":
        console.log("status event");
        break;
      default:
    }

      res.status(200).send('Event received');
  } catch (error) {
      console.error('Error processing GitHub webhook:', error.message);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  initGithubWebhook,
};

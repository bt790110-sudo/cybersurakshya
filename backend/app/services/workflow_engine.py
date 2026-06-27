# app/services/workflow_engine.py

class WorkflowEngine:

    @staticmethod
    async def execute(workflow):

        """
        Executes a workflow.

        Future:
        - Logging
        - Retry
        - Metrics
        - Event Queue
        """

        return await workflow()
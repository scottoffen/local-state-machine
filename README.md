# ASW Local Lambdas and Local State Machine Example

To run the state machine and the lambdas locally:
```
# Build the lambdas
$ sam build

# Run the lambdas via API - stop this before running the lambda container in the next step
$ sam local start-api

# Run the lambda container locally
$ sam local start-lambda

# Run the step functions locally
$ docker run -p 8083:8083 -d --name "greeting-step-functions" --env-file local/aws-environment.settings amazon/aws-stepfunctions-local

# Create the state machine. The name must be unique to the step functions instance
$ aws stepfunctions create-state-machine --endpoint http://localhost:8083 --definition file://local/local_functions.asl.json --name "LocalGreetingFunctions" --role-arn "arn:aws:iam::012345678901:role/DummyRole"

$ aws stepfunctions start-execution --endpoint http://localhost:8083 --name Pass01 --state-machine arn:aws:states:us-east-1:123456789012:stateMachine:LocalGreetingFunctions
$ aws stepfunctions get-execution-history --endpoint http://localhost:8083 --execution-arn arn:aws:states:us-east-1:123456789012:execution:LocalGreetingFunctions:Pass01 > local/execution-history.json
```

Next Steps: Build the local state machine by substituting the placeholders in the state machine with local values
https://stackoverflow.com/questions/67205015/when-locally-running-aws-stepfunctions-how-to-use-the-statemachine-asl-file-fo
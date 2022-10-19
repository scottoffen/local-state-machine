$template_source=template.json 
$sm_actual=ready_to_use.json # a "runable" tmp file with placeholders replaced with actual variable names
$sm_function_tag=REPLACEMENT_TEXT
$sm_name=MyFunctionName
$sm_arn=arn:aws:states:us-east-1:MYACCOUNT:stateMachine:$sm_name

# THIS creates the de-referenced json file
# (can have 5 -e params if replacing 5 placeholders)
sed -e "s/REPLACEME/$sm_function_tag/"  ./statemachine/$template_source > ./statemachine/$sm_actual  || exit 2

# THIS copies the file into a bash variable 
json_text=$(cat ./statemachine/$sm_actual)

# This supplies the de-referenced json file contents to the `--definition` parameter:
aws stepfunctions CMD-INVOKE-UPLOAD-WHATEVER \
  --no-cli-pager \
  --state-machine-arn $sm_arn \
  --role-arn  $sm_role_arn \
  --definition "$json_text" \
  --profile AWS-PROFILE-TO-USE || exit 2
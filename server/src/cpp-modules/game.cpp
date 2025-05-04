#include <napi.h>
#include <string>
#include <vector>

using namespace Napi;

// Function to process player choice
std::vector<std::string> HandleChoice(const std::string &choice)
{
  std::vector<std::string> result;

  if (choice == "fight")
  {
    result.push_back("You chose to fight! Prepare for battle!");
    result.push_back("attack");
    result.push_back("defend");
    result.push_back("run");
  }
  else if (choice == "explore")
  {
    result.push_back("You explore the surroundings and find something mysterious.");
    result.push_back("investigate");
    result.push_back("move on");
  }
  else if (choice == "run")
  {
    result.push_back("You run away safely!");
    result.push_back("rest");
    result.push_back("return");
  }
  else
  {
    result.push_back("Unknown choice. Try again!");
    result.push_back("fight");
    result.push_back("explore");
    result.push_back("run");
  }

  return result;
}

// N-API function to wrap the C++ logic
Value ProcessInput(const CallbackInfo &info)
{
  Env env = info.Env();

  // Check if one argument is passed and is a string
  if (info.Length() < 1 || !info[0].IsString())
  {
    TypeError::New(env, "String expected as argument").ThrowAsJavaScriptException();
    return env.Null();
  }

  std::string userChoice = info[0].As<String>().Utf8Value();
  std::vector<std::string> result = HandleChoice(userChoice);

  // Create a JS object to return results
  Object response = Object::New(env);
  response.Set("message", String::New(env, result[0]));

  Array choices = Array::New(env, result.size() - 1);
  for (size_t i = 1; i < result.size(); ++i)
  {
    choices.Set(i - 1, String::New(env, result[i]));
  }

  response.Set("choices", choices);
  return response;
}

// Register the module
Object Init(Env env, Object exports)
{
  exports.Set(String::New(env, "processInput"), Function::New(env, ProcessInput));
  return exports;
}

NODE_API_MODULE(game, Init)

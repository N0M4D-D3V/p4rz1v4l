import time

from Config.dictionary.grial_config_dictionary import app_version


# Shows the app title and version at the init.
def print_title():
    print('\n<>----------< P4RZ1V4L >----------<>')
    print('        -----< ' + app_version + ' >-----\n')


# Prints the 'option not found' message.
def print_option_not_found():
    print("\n   404 - Option not found!")
    time.sleep(1)


# Message printed at the end of the program and kills it.
def print_exit():
    print("\n\n   Wake the f*ck Up!")
    print("   We have a city to burn...")
    time.sleep(2)
    exit()


# Not implemented message
def print_not_implemented():
    print("\n   Not implemented yet!")


# Prints connectivity error and kills the current program instance.
def print_connectivity_error():
    print('\n\n   You have connectivity problems D:')
    print('   Killing program ...')
    time.sleep(2)
    exit()

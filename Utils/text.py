import time

from Config.dictionary.grial_config_dictionary import app_version


def print_title():
    print('\n<>----------< P4RZ1V4L >----------<>')
    print('        -----< ' + app_version + ' >-----\n')


def print_option_not_found():
    print("\n   404 - Option not found!")
    time.sleep(1)


def print_exit():
    print("\n\n   Wake the f*ck Up!")
    print("   We have a city to burn...")
    time.sleep(2)
    exit()


def print_not_implemented():
    print("\n   Not implemented yet!")


def print_connectivity_error():
    print('\n\n   You have connectivity problems D:')
    print('   Killing program ...')
    time.sleep(2)
    exit()

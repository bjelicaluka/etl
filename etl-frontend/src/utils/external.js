const modalBoxId = "";

export function successAlert(message) {
	swal({
    title: "Success!", 
    text: message, 
    icon: "success", 
    button: null,
    timer: 1000
  });
}

export function errorAlert(message) {
	swal({
    title: "Fail.", 
    text: message, 
    icon: "error", 
    button: null,
    timer: 1000
  });
}

function toggleModal() {
	$(modalBoxId).modal('toggle');
}

function isModalOpen() {
  return ($(modalBoxId).data('bs.modal') || {})._isShown;
}

export function closeModal() {
	!!isModalOpen() && toggleModal();
}

export function openModal() {
	!isModalOpen() && toggleModal();
}